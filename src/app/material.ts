import { MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatTabsModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatTabsModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule
	],
	exports: [
		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatTabsModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule
	],
})
export class MaterialModule { }