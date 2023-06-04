import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'tk-shell',
    standalone: true,
    imports: [CommonModule, FooterComponent, HeaderComponent],
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
