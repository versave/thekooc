import { Breakpoint } from './media.model';

export interface ImageProperties {
    // Pass default non WebP image path
    path: string;
    hasRetina: boolean;
    breakpoints?: Breakpoint[];
}

export interface ImageSrcset {
    media: string;
    url: string;
    type: string;
}

export interface ImageData {
    defaultWebpSrcsetUrl: string;
    defaultSrcsetUrl: string;
    mediaSrcsets: ImageSrcset[];
}
