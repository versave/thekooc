import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../components/CardGrid/card-grid.component';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule, CardGridComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
