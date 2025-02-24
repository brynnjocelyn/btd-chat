export interface PBErrorResponse {
  code: 400;
  message: string;
  data: {
    [key: string]: {
      code: string;
      message: string;
    };
  };
}
