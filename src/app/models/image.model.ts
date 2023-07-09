import { Breakpoint } from './media.model';

export interface ImageProperties {
    path: string;
    hasRetina: boolean;
    breakpoints?: Breakpoint[];
    alt?: string;
}

export interface ImageSrcset {
    media: string;
    url: string;
    type: string;
}

export interface ImageData {
    srcsetUrl: string;
    mediaSrcsets: ImageSrcset[];
}

export interface ImageControl {
    file: File | null;
    imageUrl: string | null;
}

export interface ImageUploadRequest {
    files: File[];
    folder: string;
}

export interface UpdateImageUploadRequest {
    uploadableImages: File[];
    originalImages: string[];
    folder: string;
}
