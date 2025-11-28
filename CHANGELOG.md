## [1.1.0] - 2025-11-28

### Added

- **Enhanced Filter Removal**: `removeFilter` function now supports both single keys and arrays of keys
- **New Submit Handler**: Added `handleSubmit` function as an alternative to `onSubmit`

### Changed

- **Improved API Consistency**: Extended `removeFilter` to handle multiple items while maintaining backward compatibility
- **Function Naming**: Added `handleSubmit` alongside existing `onSubmit` for naming consistency

### Removed

- **`removeFilters` function**: Functionality now handled by enhanced `removeFilter` method

### Enhanced Functionality

#### removeFilter Now Handles Arrays

The `removeFilter` function has been enhanced to accept both single filter keys and arrays of keys, replacing the need for separate `removeFilters` function:

```typescript
// Single key (existing functionality)
removeFilter('category');

// Array of keys (replaces removeFilters functionality)
removeFilter(['category', 'status', 'price']);
```
