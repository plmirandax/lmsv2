import * as React from "react"
import { useState, useEffect } from "react"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SelectedTenantContext } from './SelectedTenantContext';

interface TenantComboBoxProps {
  onTenantSelected?: (tenant: Tenant) => void;
  selectedTenantId: string; // Add selectedTenantId prop
}

export type Tenant = {
  id: string;
  name: string;
  email: string;
  tenantCode: string;
  tenantImage: string | null;
};

export function TenantComboBox({ onTenantSelected, selectedTenantId }: TenantComboBoxProps) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const { setSelectedTenantId } = React.useContext(SelectedTenantContext);

  useEffect(() => {
    fetch('/api/dropbox-tenant') // replace with your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setTenants(data.tenants))
      .catch(error => console.error('Failed to fetch tenants:', error));
  }, []);

  const handleTenantSelected = (tenant: Tenant) => {
    setSelectedTenantId(tenant.id);
    if (onTenantSelected) {
      onTenantSelected(tenant);
    }
  };
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="tenant">Tenant</Label>
      <select 
  value={selectedTenantId} 
  onChange={(e) => setSelectedTenantId(e.target.value)}
  className="w-full mt-2 px-1 py-2 border dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 sm:text-sm dark:bg-gray-800 dark:text-white transition-colors duration-200 ease-in-out"
>
  <option value="" className="bg-white dark:bg-gray-800 dark:text-white">Select tenant...</option>
  {tenants.map((tenant) => (
    <option key={tenant.id} value={tenant.id} className="bg-white dark:bg-gray-800 dark:text-white">
      {tenant.name}
    </option>
  ))}
</select>
    </div>
  );
}