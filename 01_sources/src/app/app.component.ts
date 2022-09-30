/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-09-30 15:47:21
 * @ Description: Main component variables and functions
 */

/* SUMMARY
  * Angular
  * Name: genRandomColor
  * Name: componentToHex
  * Name: rgbToHex
  * Name: checkConstrast
*/

/* Angular */
import { Component, OnInit } from '@angular/core';
/***/

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public color: string = "6DED35";
  public isConstrasted: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.genRandomColor();
  }

  /*
  * Name: genRandomColor
  * Description: Generate random color
  *
  * Return (String): Random hex code
  */
  public genRandomColor(): void {
    let rgb = [0, 0, 0];

    rgb[0] = Math.round(Math.random() * 255);
    rgb[1] = Math.round(Math.random() * 255);
    rgb[2] = Math.round(Math.random() * 255);

    this.isConstrasted = this.checkContrast(rgb);

    this.color = this.rgbToHex(rgb[0], rgb[1], rgb[2]);
  }
  /***/

  /*
  * Name: componentToHex
  * Description: Convert part of RGB to HEX
  *
  * Args:
  * - c (Number): Part to convert
  *
  * Return (String): Part converted
  */
  private componentToHex(c): string {
    var hex = c.toString(16);
    return(hex.length == 1 ? "0" + hex : hex);
  }
  /***/

  /*
  * Name: rgbToHex
  * Description: Convert RGB color to HEX
  *
  * Args:
  * - r (Number): Red
  * - g (Number): Green
  * - b (Number): Blue
  *
  * Return (String): Converted RGB color
  */
  private rgbToHex(r, g, b): string {
    return(this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)).toUpperCase();
  }
  /***/

  /*
  * Name: checkConstrast
  * Description: Check if button need to be constrasted
  *
  * Args:
  * - rgb (Array<number>): Color in RGB format
  *
  * Return (Boolean): Need to be constrasted or not
  */
  private checkContrast(rgb: Array<number>): boolean {
    let brightness = Math.round(( (rgb[0] * 299) +
                                  (rgb[1] * 587) +
                                  (rgb[2] * 114)) / 1000);
    return((brightness > 125) ? true : false);
  }
  /***/
}
