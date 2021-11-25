
export const CrudFetch = () => {

    const fetch = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const get = async (url) => {
        return await fetch(url);
    }

    const post = async (url,body) => {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const put = async (url, body) => {
        return await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const remove = async (url) => {
        return await fetch(url, {
            method: 'DELETE'
        });
    }

    return {
        get,
        post,
        put,
        remove
    }

}
