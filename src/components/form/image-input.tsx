import cn from 'classnames';
import { InputHTMLAttributes } from 'react';
import { FaImage } from 'react-icons/fa';
import { MdCloudUpload } from 'react-icons/md';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  images: File[];
  removeImage: (index: number) => void;
  error?: string;
}

const ImageInput = ({
  images,
  removeImage,
  error,
  ...rest
}: ImageInputProps) => {
  return (
    <div
      className={cn(
        'relative col-span-full w-full border rounded-md min-h-[200px] bg-gray-50',
        { 'border-red-500': error }
      )}
    >
      {images.length <= 0 && (
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center text-gray-300'>
          <MdCloudUpload className=' w-9 h-9' />
          <h1 className='text-sm font-semibold'>Upload Images</h1>
        </div>
      )}
      <input
        type='file'
        accept='image/*'
        className={cn(
          'file:hidden bg-transparent absolute inset-0 text-transparent'
        )}
        multiple
        {...rest}
      />
      {error && (
        <p className='text-sm text-red-500 absolute bottom-[-25px]'>{error}</p>
      )}
      {images.length > 0 && (
        <>
          <div className='flex items-center justify-center gap-4 flex-wrap absolute inset-0 '>
            {Array.from(images).map((image, index) => (
              <div key={image.name} className='relative w-[100px] h-[70px]'>
                <img
                  src={URL.createObjectURL(image)}
                  alt='preview'
                  className='w-full h-full object-cover'
                />
                <button
                  onClick={() => removeImage(index)}
                  className='absolute top-[-5px] right-[5px] font-semibold text-red-500'
                  type='button'
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 font-semibold px-2 py-1.5 bg-white rounded absolute bottom-[10px] right-[10px] border text-sm'>
            <FaImage />
            {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageInput;
