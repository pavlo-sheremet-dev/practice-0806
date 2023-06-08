import { useSearchParams } from 'react-router-dom';

const Form = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = event => {
    event.preventDefault();
    const search = event.target.search.value.trim().toLowerCase();
    if (!search) return;
    setSearchParams({ query: search });
  };

  const search = searchParams.get('query') ?? '';

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" name="search" defaultValue={search} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
