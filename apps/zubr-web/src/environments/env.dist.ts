type Env = {
  apiURL: string
}

let url: string = '${API_URL}';

export const env: Env = {
  apiURL: url === '${API_URL}' ? 'https://zubr.club' : url
}
