import { Pool } from "pg";

export default interface UseCaseType {
    pool: Pool,
    query: string, 
}