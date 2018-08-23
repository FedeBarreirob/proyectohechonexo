import { MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatTabsModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule
	],
	exports: [
		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatTabsModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule
	],
})
export class MaterialModule { }