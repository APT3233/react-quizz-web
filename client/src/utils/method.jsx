
export const get = async (url) => {
    try{
        const res = await fetch(url)
        if(!res.ok)
            throw new Error(`[-] GET error: Status: ${res.status}`)
        return await res.json()
    }
    catch(err){
        console.error(`[-] Error fetching data: ${err}`)
    }
}
export const post = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        if(!res)    throw new Error(`[-] Post error: ${res.status}`)
        return await res.json()

    } catch (err) {
        console.error(`Error post data: ${err}`)
    }
}

export const update = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        });
        
        if (!res.ok) {
            throw new Error(`[-] Update error: ${res.status}`);
        }
        
        return await res.json();
    } catch (err) {
        console.error(`Error update data: ${err}`);
    }
}

export const remove = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
        
        if (!res.ok) {
            throw new Error(`[-] Delete error: ${res.status}`);
        }
        
        return await res.json();
    } catch (err) {
        console.error(`Error delete data: ${err}`);
    }
}
