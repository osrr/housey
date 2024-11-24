import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { firebaseUploadFiles } from '../../helpers';
import { HouseType, Unit } from '../../../types';
import ImageInput from '../../components/form/image-input';
import Button from '../../components/button';
import Input from '../../components/form/input';
import PhoneInput from '../../components/form/phone-input';
import Select from '../../components/form/select';
import { v4 as uuidv4 } from 'uuid';
import zod from 'zod';
import data from '../../../data.json';
import Textarea from '../../components/form/textarea';

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

const ProfileEditPostPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { selectedPost } = useAppSelector((state) => state.posts);

  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      dispatch(fetchPostById(params.id));
    }

    console.log(selectedPost);
  }, []);

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
    };

    // dispatch(addPost(newPost));

    console.log('done');
    setLoading(false);
    navigate('/units');
  };

  if (!selectedPost) {
    return <div>loading...</div>;
  }

  if (selectedPost) {
    return (
      <div className='mt-6'>
        <h1 className='text-2xl font-bold'>Edit Unit</h1>
        <form
          className='mt-6 grid grid-cols-4 gap-6'
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
          />
          <Button
            primary
            outline
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
              value={getValues('phone') || ''}
              error={errors.phone?.message}
              onChange={(e) =>
                setValue('phone', e.target.value, { shouldValidate: true })
              }
            />
          )}
          <Input
            {...register('title')}
            label='Title'
            onChange={(e) => {
              setValue('title', e.target.value, { shouldValidate: true });
            }}
            error={errors.title?.message}
            placeholder='4 bedroom villa, duplex apartment...'
          />
          <Textarea
            {...register('description')}
            label='Description'
            onChange={(e) =>
              setValue('description', e.target.value, { shouldValidate: true })
            }
            error={errors.description?.message}
          />
          <Select
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
            error={errors.city?.message}
            options={data.cities.map((city) => ({ label: city, value: city }))}
            onChange={(e) =>
              setValue('city', e.target.value, { shouldValidate: true })
            }
          />
          <Input
            label='Address'
            {...register('address')}
            error={errors.address?.message}
            onChange={(e) =>
              setValue('address', e.target.value, { shouldValidate: true })
            }
          />

          <Input
            label='Beds'
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

          <Button type='submit' disabled={loading} primary>
            Add New Unit
          </Button>
        </form>
      </div>
    );
  }
};

export default ProfileEditPostPage;