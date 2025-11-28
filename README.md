# react-use-filters

React hooks for managing and manipulating filter state. This library provides a set of React hooks that simplify the process of managing filter state in your applications. It offers a flexible and intuitive API to create, update, and reset filters, making it easy to build complex filtering interfaces.

## Features

-   TypeScript Support: Built with TypeScript, providing type safety.
-   Flexible Filter Management: Easily manage various filter types, including text and multi-select filters.
-   Context-Based: Uses React Context to provide filter state and methods to your components.
-   Easy to Use: Simple and intuitive API for quick integration into your projects.
-   Small size  and no dependencies.

## Installation


```npm install react-use-filters```


## Quickstart

```typescript
import { useState } from 'react'
import { useFilters } from 'react-use-filters'

interface Filters {
  filtersGroup: string[]
}

function App() {
  // For example we will use react-state for storing filters
  const [filters, setFilters] = useState<Filters>({ filtersGroup: []})

  const { 
    setFilter, 
    state: { count, isReady }, 
    handleSubmit 
  } = useFilters<Filters>({ 
    defaultValues: filters, 
    submitFn: ({ state }) => setFilters(state)
  })

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
          )
        })}
      </div>
      <button disabled={!isReady} onClick={handleSubmit}>
        Submit | Count: {count}
      </button>
    </div>
  )
}
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

MIT