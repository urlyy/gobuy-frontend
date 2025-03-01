
// http.js
class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // 通用请求方法
    async request(method, endpoint, options = {}) {
        const key = "Authorization"
        console.log("", method, endpoint);
        const isServer = typeof window === 'undefined';
        const { query = {}, body = null, headers = {} } = options;
        const url = new URL(endpoint, this.baseUrl);

        if (isServer) {
            const { cookies } = await import('next/headers');
            const tmp = (await cookies()).get(key);
            if (tmp) {
                headers[key]= tmp.value;
            }
        }else{
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ');
            for (let cookie of cookies) {
                const [k, value] = cookie.split('=');
                if (k === key) {
                    headers[key] = decodeURIComponent(value);
                }
            }
        }
        // 处理查询参数
        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json", // 默认 JSON 格式
                    ...headers
                },
                body: body ? JSON.stringify(body) : null
            });

            if (!response.ok) {
                const res = await response.json();
                throw new Error(`Request failed: ${response.status} ${res.message}`);
            }

            // 尝试解析响应数据
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error(`${method} request error:`, error.message);
            throw error;
        }
    }

    // GET 请求
    async get(endpoint, query = {}) {
        return this.request("GET", endpoint, { query });
    }

    // POST 请求
    async post(endpoint, body = {}, query = {}) {
        return this.request("POST", endpoint, { query, body });
    }

    // PUT 请求
    async put(endpoint, body = {}, query = {}) {
        return this.request("PUT", endpoint, { query, body });
    }

    // DELETE 请求
    async delete(endpoint, query = {}) {
        return this.request("DELETE", endpoint, { query });
    }
}

const apiClient = new HttpClient(process.env.NEXT_PUBLIC_BACKEND);

export default apiClient;