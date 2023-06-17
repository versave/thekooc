import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormControl } from '../../directives/custom-form-control.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from '../image/image.component';

@Component({
    selector: 'tk-image-upload',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageComponent],
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent extends CustomFormControl {
    @Output() public inputChange = new EventEmitter<any>();
}
