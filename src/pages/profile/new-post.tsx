import { useState } from 'react';
import Input from '../../components/form/input';
import { addPost, useAppDispatch, useAppSelector } from '../../store';
import { HouseType, Unit } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/form/select';
import data from '../../../data.json';
import ImageInput from '../../components/form/image-input';
import { firebaseUploadFiles } from '../../helpers';
import Button from '../../components/button';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Textarea from '../../components/form/textarea';
import PhoneInput from '../../components/form/phone-input';

const imageFileSchema = zod
  .custom<File>((file) => file instanceof File, 'Image is required')
  .refine((file) => file.type.startsWith('image/'), 'Must be an image')
  .refine((file) => file.size <= 5 * 1024 * 1024, 'Max size is 5MB');

const formSchema = zod.object({
  images: zod
    .array(imageFileSchema)
    .refine(
      (value) => value.length >= 2,
      'At least two images must be uploaded'
    ),
  title: zod
    .string()
    .refine(
      (value) => value.trim().split(/\s+/).length >= 2,
      'Title must be at least 2 words'
    ),
  description: zod
    .string()
    .refine(
      (value) => value.trim().split(/\s+/).length >= 5,
      'Description must be at least 5 words'
    ),
  phone: zod
    .string()
    .min(9, 'Phone number must be at least 9 numbers')
    .optional(),
  type: zod.string(),
  city: zod.string(),
  address: zod.string(),
  baths: zod.number().nonnegative('Baths must be a positive number'),
  beds: zod.number().nonnegative('Beds must be a positive number'),
  sqft: zod.number().nonnegative('Square footage must be a positive number'),
});

type FormData = zod.infer<typeof formSchema>;

const ProfileNewPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      city: data.cities[0],
      images: [],
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // e.preventDefault();
    console.log('clicked');

    setLoading(true);
    const uploadedImages = await firebaseUploadFiles('units', data.images);

    if (!uploadedImages) {
      alert('failed to upload images try again later.');
      setLoading(false);
      return;
    }

    const newPost: Unit = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      type: data.type as HouseType,
      phone: showNumber ? `+971-${data.phone}` : currentUser.phone,
      location: {
        city: data.city,
        address: data.address,
      },
      beds: data.beds,
      baths: data.baths,
      sqft: data.sqft,
      images: uploadedImages,
      reviews: [],
      user: {
        userId: currentUser.id,
        username: currentUser.username,
        photoURL: currentUser.photoURL,
        phone: currentUser.phone,
      },
      createdAt: new Date().toISOString(),
    };

    dispatch(addPost(newPost));

    console.log('done');
    setLoading(false);
    navigate('/units');
  };

  return (
    <div className='mt-6 w-full md:w-[60%] mx-auto'>
      <h1 className='text-2xl font-bold'>New Unit</h1>
      <form
        className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ImageInput
          {...register('images')}
          images={getValues('images') || []}
          onChange={(e) => {
            const fileList = e.target.files;

            if (fileList) {
              setValue('images', Array.from(fileList), {
                shouldValidate: true,
              });
            } else {
              setValue('images', [], { shouldValidate: true });
            }
          }}
          removeImage={(index) => {
            const currentImages = getValues('images') || [];
            const updatedImages = currentImages.filter((_, i) => i !== index);
            setValue('images', updatedImages, { shouldValidate: true });
          }}
          error={errors.images?.message}
          multiple
        />
        <Input
          {...register('title')}
          label='Title'
          wrapperClassName='md:col-span-2'
          onChange={(e) => {
            setValue('title', e.target.value, { shouldValidate: true });
          }}
          error={errors.title?.message}
          placeholder='4 bedroom villa, duplex apartment...'
        />
        <Textarea
          {...register('description')}
          label='Description'
          className='h-[300px]'
          onChange={(e) =>
            setValue('description', e.target.value, { shouldValidate: true })
          }
          error={errors.description?.message}
        />
        <Select
          wrapperClassName='md:col-span-2'
          {...register('type')}
          label='House Type'
          error={errors.type?.message}
          options={[
            { label: 'Apartment', value: 'Apartment' },
            { label: 'Farmhouse', value: 'Farmhouse' },
            { label: 'House', value: 'House' },
            { label: 'Skyscraper', value: 'Skyscraper' },
          ]}
          onChange={(e) =>
            setValue('type', e.target.value, { shouldValidate: true })
          }
        />
        <Select
          {...register('city')}
          label='City'
          wrapperClassName='md:col-span-2'
          error={errors.city?.message}
          options={data.cities.map((city) => ({ label: city, value: city }))}
          onChange={(e) =>
            setValue('city', e.target.value, { shouldValidate: true })
          }
        />
        <Input
          label='Address'
          wrapperClassName='md:col-span-2'
          {...register('address')}
          error={errors.address?.message}
          onChange={(e) =>
            setValue('address', e.target.value, { shouldValidate: true })
          }
        />

        <Input
          label='Beds'
          wrapperClassName='md:col-span-2'
          {...register('beds', { valueAsNumber: true })}
          error={errors.beds?.message}
          onChange={(e) =>
            setValue('beds', e.target.valueAsNumber, {
              shouldValidate: true,
            })
          }
          type='number'
          min={0}
        />
        <Input
          label='Baths'
          wrapperClassName='md:col-span-2'
          {...register('baths', { valueAsNumber: true })}
          error={errors.baths?.message}
          onChange={(e) =>
            setValue('baths', e.target.valueAsNumber || 0, {
              shouldValidate: true,
            })
          }
          type='number'
          min={0}
        />
        <Input
          label='Square Foot'
          wrapperClassName='md:col-span-2'
          {...register('sqft', { valueAsNumber: true })}
          error={errors.sqft?.message}
          onChange={(e) =>
            setValue('sqft', e.target.valueAsNumber || 0, {
              shouldValidate: true,
            })
          }
          type='number'
          min={0}
        />
        <div className={'col-span-full grid grid-cols-3 gap-4'}>
          <Button
            primary
            outline
            className='col-span-1 my-auto'
            onClick={() => {
              setShowNumber(!showNumber);
              if (!showNumber) {
                setValue('phone', '');
              }
            }}
            type='button'
          >
            {!showNumber
              ? 'Add Custom Phone Number'
              : 'Use Account Phone Number'}
          </Button>
          {showNumber && (
            <PhoneInput
              {...register('phone')}
              wrapperClassName='md:col-span-2'
              value={getValues('phone') || ''}
              error={errors.phone?.message}
              onChange={(e) =>
                setValue('phone', e.target.value, { shouldValidate: true })
              }
            />
          )}
        </div>
        <Button type='submit' disabled={loading} primary>
          Add New Unit
        </Button>
      </form>
    </div>
  );
};

export default ProfileNewPostPage;
