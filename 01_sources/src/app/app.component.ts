/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-09-30 15:47:21
 * @ Description: Main component variables and functions
 */

/* SUMMARY
  * Angular
  * Capacitor
  * Name: getStorage
  * Name: saveColor
  * Name: isSaved
  * Name: copyToClipboard
  * Name: genRandomColor
  * Name: componentToHex
  * Name: rgbToHex
  * Name: hexToRgb
  * Name: checkConstrast
*/

/* Angular */
import { Component, OnInit } from '@angular/core';
/***/

/* Capacitor */
import { Clipboard } from '@capacitor/clipboard';
/***/

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public savedColors: string[] = [];

  public color: string = "6DED35";
  public isConstrasted: boolean = true;

  public favoritesOpen: boolean = false;

  public copiedColor: string;

  constructor() {
  }

  ngOnInit(): void {
    this.savedColors = this.getStorage();
    this.genRandomColor();
  }

  /*
  * Name: getStorage
  * Description: Get saved list colors
  *
  * Return (Array<string>): Colors list
  */
  private getStorage(): string[] {
    let ret;

    try {
      ret = localStorage.getItem('colors');
      ret = ret ? JSON.parse(ret) : [];
    } catch (e) {
      console.error(e);
      ret = [];
    }

    return (ret);
  }
  /***/

  /*
  * Name: saveColor
  * Description: Save color in favorites
  *
  * Args:
  * - color (String): Color in HEX format
  */
  public saveColor(color): void {
    let alreadySave = this.savedColors.findIndex((el) => {
      return el == color;
    });

    if (alreadySave != -1) this.savedColors.splice(alreadySave, 1);
    else this.savedColors.push(color);

    localStorage.setItem('colors', JSON.stringify(this.savedColors));
  }
  /***/

  /*
  * Name: isSaved
  * Description: Check if color is already saved
  *
  * Args:
  * - color (String): Color to check
  *
  * Return (Boolean): Is saved or not
  */
  public isSaved(color): boolean {
    let ret = this.savedColors.find((el) => {
      return el == color;
    });

    return ret ? true : false;
  }
  /***/

  /*
  * Name: copyToClipboard
  * Description: Copy color to clipboard
  *
  * Args:
  * - color (String): Color to copy
  */
  public async copyToClipboard(color): Promise<void> {
    await Clipboard.write({string: "#"+color});
    this.copiedColor = color;

    setTimeout(() => {
      this.copiedColor = null;
    }, 2000);
  }
  /***/

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
  * Name: hexToRgb
  * Description: Convert HEX color to RGB
  *
  * Args:
  * - color (String): Color in HEX format
  *
  * Return (Array<number>): Color in RGB
  */
  public hexToRgb(color): number[] {
    let aRgbHex = color.match(/.{1,2}/g);
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
   return (aRgb);
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
  public checkContrast(rgb: Array<number>): boolean {
    let brightness = Math.round(( (rgb[0] * 299) +
                                  (rgb[1] * 587) +
                                  (rgb[2] * 114)) / 1000);
    return((brightness > 125) ? false : true);
  }
  /***/
}
