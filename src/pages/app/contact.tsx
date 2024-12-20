import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import Input from '../../components/form/input';
import Textarea from '../../components/form/textarea';
import Button from '../../components/custom-button';

const ContactPage = () => {
  return (
    <div className='mt-8'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-2'>We'd Love to Hear From You.</h1>
        <p className='text-zinc-400 text-center w-[900px]'>
          Got questions about our listings or need help finding your dream home?
          Reach out to us for personalized assistance and expert advice. We're
          here to make your real estate journey smooth and stress-free.
        </p>
      </div>
      <div className='grid grid-cols-5 gap-8 p-4 rounded-md bg-white border h-[500px] mt-8 max-w-[1200px] mx-auto shadow-md'>
        <div className='col-span-2 bg-primary text-white p-6 rounded-md'>
          <div className='mb-10'>
            <h1 className='font-semibold text-2xl'>Contact Information</h1>
            <p className='text-sm text-white/60'>
              Whether you have questions or just want to say hello, we’re here
              to help.
            </p>
          </div>
          <div className='flex flex-col items-start justify-center gap-10 space-y-4'>
            <div className='flex items-center gap-4'>
              <FaPhone className='w-6 h-6' />
              <p>+971-555555555</p>
            </div>
            <div className='flex items-center gap-4'>
              <FaEnvelope className='w-6 h-6' />
              <p>support@housey.com</p>
            </div>
            <div className='flex items-center gap-4'>
              <MdLocationPin className='w-6 h-6' />
              <p>Dubai, Marina</p>
            </div>
          </div>
        </div>
        <div className='col-span-3'>
          <form className='grid grid-cols-4 gap-4'>
            <div className='col-span-2'>
              <Input label='Your Name' />
            </div>
            <div className='col-span-2'>
              <Input label='Your Email' wrapperClassName='col-span-2' />
            </div>
            <div className='col-span-2'>
              <Input label='Your Phone number' wrapperClassName='col-span-2' />
            </div>
            <div className='col-span-full'>
              <Textarea
                label='Your Message'
                wrapperClassName='min-h-[200px]'
                className='resize-none h-full min-h-[200px]'
              />
            </div>
            <div className=''>
              <Button primary>Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
