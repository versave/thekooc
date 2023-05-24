import { Injectable } from '@angular/core';
import { ImageProperties, ImageSrcset, ImageData } from '../../models/image.model';
import { MediaService } from '../media-service/media.service';
import { Breakpoint } from '../../models/media.model';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor(private mediaService: MediaService) {}

    public makeImageData(imageProperties: ImageProperties): ImageData {
        const { path, hasRetina } = imageProperties;
        const webpFileNameType = this.makeFileNameType(path, true, false);
        const defaultWebpSrcsetUrl = hasRetina
            ? `${webpFileNameType}, ${this.makeFileNameType(path, true, true)} 2x`
            : webpFileNameType;
        const defaultSrcsetUrl = hasRetina ? `${path}, ${this.makeFileNameType(path, false, true)} 2x` : path;
        const mediaSrcsets = this.makeMediaSrcsets(imageProperties);

        return { defaultWebpSrcsetUrl, defaultSrcsetUrl, mediaSrcsets };
    }

    private getFilenameAndType(filePath: string): string[] {
        const fileExtensionSeparator = '.';
        const lastIndex = filePath.lastIndexOf(fileExtensionSeparator);
        const pathWithoutType = filePath.slice(0, lastIndex);
        const fileType = filePath.slice(lastIndex + 1);

        return [pathWithoutType, fileType];
    }

    private makeFileNameType(path: string, webp: boolean, retina: boolean, breakpoint?: Breakpoint): string {
        const filenameAndType = this.getFilenameAndType(path);
        const fileType = webp ? 'webp' : filenameAndType[1];
        const suffix = retina ? '@2x' : '';

        return breakpoint
            ? `${filenameAndType[0]}-${breakpoint}${suffix}.${fileType}`
            : `${filenameAndType[0]}${suffix}.${fileType}`;
    }

    private makeMediaSrcsets(imageProperties: ImageProperties): ImageSrcset[] {
        const { path, hasRetina, breakpoints } = imageProperties;
        const srcsets: ImageSrcset[] = [];

        breakpoints?.reverse().forEach((breakpoint) => {
            const breakpointSize = this.mediaService.getBreakpointSize(breakpoint);
            const webpFileNameType = this.makeFileNameType(path, true, false, breakpoint);
            const defaultFileNameType = this.makeFileNameType(path, false, false, breakpoint);
            const webpUrl = hasRetina
                ? `${webpFileNameType}, ${this.makeFileNameType(path, true, true, breakpoint)} 2x`
                : webpFileNameType;
            const defaultUrl = hasRetina
                ? `${defaultFileNameType}, ${this.makeFileNameType(path, false, true, breakpoint)} 2x`
                : defaultFileNameType;

            srcsets.push({ media: `(max-width:${breakpointSize}px)`, url: webpUrl, type: 'image/webp' });
            srcsets.push({ media: `(max-width:${breakpointSize}px)`, url: defaultUrl, type: '' });
        });

        return srcsets;
    }
}
