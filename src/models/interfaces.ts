export interface Message {
    id: string
    author: string
    text: string
    datetime: Date
}

export interface UserInfo {
    name: string | null
    info: string | null
}

export interface Author {
    id: number
    name: string
    info: string
    messages: Message[]
}