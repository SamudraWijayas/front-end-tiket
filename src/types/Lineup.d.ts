interface ILineup {
  _id?: string;
  nama: string;
  sosialmedia?: string;
  foto?: string | FileList;
  urut?: string | number;
  isActive?: boolean;
  events?: string;
}

export type { ILineup };
