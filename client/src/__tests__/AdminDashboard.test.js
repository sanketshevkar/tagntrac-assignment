import { render } from '@testing-library/react';
import { AdminDashboard } from '../pages/AdminDashboard';


jest.mock('../hooks/useAdminDashboard', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    activeShipmentsData: [],
    unassignedShipmentsData: [],
    pastShipmentsData: [],
  })),
}));

describe('AdminDashboard', () => {
  it('renders the component', () => {
    const { getByText } = render(<AdminDashboard />);

    const unassignedShipmentsHeader = getByText('Unassigned Shipments');
    const activeShipmentsHeader = getByText('Active Shipments');
    const deliveredShipmentsHeader = getByText('Delivered Shipments');

    expect(unassignedShipmentsHeader).toBeInTheDocument();
    expect(activeShipmentsHeader).toBeInTheDocument();
    expect(deliveredShipmentsHeader).toBeInTheDocument();
  });
});