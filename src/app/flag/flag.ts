export interface Flag {
  id?: string;
  options: {
    icon: {
      url: string;
    };
    animation: number;
  };

  location: {
    lat: number;
    lng: number;
  };
  uid?: string;
  createdAt?: number;
  lastModified?: number;
}
