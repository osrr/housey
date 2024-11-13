import { useParams } from 'react-router-dom';

const Unit = () => {
  const params = useParams();

  return (
    <div>
      <h1>this unit id is {params.id}</h1>
    </div>
  );
};

export default Unit;
