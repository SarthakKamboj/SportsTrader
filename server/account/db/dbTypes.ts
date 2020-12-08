export interface DbType {
  user: string,
  host: string,
  database: string,
  password?: string,
  port: number 
}

export interface DbQueryType {
  query: string,
}

// export const dbErrors = {
//   "08003": "connection_does_not_exist",
//   "08006": "connection_failure",
//   "2F002": "modifying_not_permitted",
//   "57P03": "cannot_connect_now",
//   "42601": "syntax_error",
//   "42501": "insufficient_privilege",
//   "42602": "invalid_name",
//   "42622": "name_too_long",
//   "42939": "reserved_name",
//   "42703": "undefined_column",
//   "42000": "syntax_error_or_access_rule_violation",
//   "42P01": "undefined_table",
//   "42P02": "undefined_parameter"
// };