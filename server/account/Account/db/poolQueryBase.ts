import UseCaseType from '../use-cases/useCaseType';

export const pgQuery = async ({ pool, query }: UseCaseType, info: any = null) => {
    const inputs = [];
    let error: any | null = null;
    let response: any | null = null;

    if (info == null) {

        await pool.query(query)
        .then(res => { response = res })
    } else {

        for (const [,value] of Object.entries(info)) {
            inputs.push(value);
        }

        try {
            response = await pool.query(query, inputs);
        } catch(err: any) {
            error = errorToString(parseInt(err.code));
            console.log(err);
        }
    }


    return Object.freeze({
        response,
        error
    })
}

const errorToString = (code: number): string => {
    let error: string = "";

    if (code == 23505) {
        error = "username already exists"; 
    } else if (code == 42601) {
        error = "syntax error";
    } else if (code == 22003) {
        error = "int out of range"
    } else if (code == 22008) {
        error = "need a different datestyle setting"
    }

    return error;
}