export interface AdminSignInRequestDto {
    signInId: string;
    password: string;
}
export interface AdminSignInResponseDto {
    accessToken: string;
    refreshToken: string;
}
