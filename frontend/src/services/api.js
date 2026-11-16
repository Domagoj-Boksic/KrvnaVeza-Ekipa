// api za backend, pravimo _service.js za posebne slučajeve
async function request(path, {method = "GET", body, headers = {}} = {}) {
    const res = await fetch(path, {
        method,
        credentials: 'include',
        headers: body ? {
            "Content-Type": "application/json",
        } : undefined,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const porukaGreske = data?.greska || res.statusText || 'Došlo je do greške na serveru';
        throw new Error(porukaGreske);
    }

    return data;
}

export default request;