import React from 'react';

export const SelectedTenantContext = React.createContext({
  selectedTenantId: '',
  setSelectedTenantId: (id: string) => {},
});