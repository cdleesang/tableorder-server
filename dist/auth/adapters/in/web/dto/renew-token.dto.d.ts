export interface RenewTokenRequestDto {
    refreshToken: string;
}
export interface RenewTokenResponseDto {
    accessToken: string;
    refreshToken: string;
}
