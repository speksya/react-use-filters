import { useState } from 'react';
import { useFilters } from 'react-use-filters';

interface Filters {
  filtersGroup: string[];
}

function App() {
  // For example we will use react-state for storing filters
  const [filters, setFilters] = useState<Filters>({ filtersGroup: [] });

  const {
    setFilter,
    state: { count, isReady },
    onSubmit,
  } = useFilters<Filters>({
    defaultValues: filters,
    submitFn: ({ state }) => setFilters(state),
  });

  return (
    <div>
      <div>
        {['Filter1', 'Filter2', 'Filter3'].map((filter) => {
          return (
            <button
              onClick={() => setFilter('filtersGroup', filter)}
              key={filter}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <button disabled={!isReady} onClick={onSubmit}>
        Submit | Count: {count}
      </button>
    </div>
  );
}

export default App;
