export type ErrorField = {
  field: string;
  message: string;
  code: string;
};

export type Error = {
  success: boolean;
  message: string;
  code: string;
  errors: ErrorField[];
  statusCode: number;
};
