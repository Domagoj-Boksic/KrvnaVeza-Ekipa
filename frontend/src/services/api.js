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
        throw new Error(data.greska);
    }

    return data;
}

export default request;