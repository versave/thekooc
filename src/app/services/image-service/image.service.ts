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
        const fileNameType = this.makeFileNameType(path, false);
        const srcsetUrl = hasRetina ? `${fileNameType}, ${this.makeFileNameType(path, true)} 2x` : fileNameType;
        const mediaSrcsets = this.makeMediaSrcsets(imageProperties);

        return { srcsetUrl, mediaSrcsets };
    }

    private getFilenameAndType(filePath: string): string[] {
        const fileExtensionSeparator = '.';
        const lastIndex = filePath.lastIndexOf(fileExtensionSeparator);
        const pathWithoutType = filePath.slice(0, lastIndex);
        const fileType = filePath.slice(lastIndex + 1);

        return [pathWithoutType, fileType];
    }

    private makeFileNameType(path: string, retina: boolean, breakpoint?: Breakpoint): string {
        const filenameAndType = this.getFilenameAndType(path);
        const fileType = filenameAndType[1];
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
            const fileNameType = this.makeFileNameType(path, false, breakpoint);
            const url = hasRetina
                ? `${fileNameType}, ${this.makeFileNameType(path, true, breakpoint)} 2x`
                : fileNameType;

            srcsets.push({ media: `(max-width:${breakpointSize}px)`, url, type: 'image/webp' });
        });

        return srcsets;
    }
}
