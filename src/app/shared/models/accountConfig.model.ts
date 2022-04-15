export class SelectLoc {

  private title: String;
  private colorContent: String;
  private subTitle: String;
  private selectLocImage: String;

  constructor() {
    this.title = '';
    this.colorContent = '';
    this.subTitle = '';
    this.selectLocImage = '';
  }

  public get _title(): String {
    return this.title;
  }

  public set _title(title: String) {
    this.title = title;
  }

  public get _colorContent(): String {
    return this.colorContent;
  }

  public set _colorContent(colorContent: String) {
    this.colorContent = colorContent;
  }

  public get _subTitle(): String {
    return this.subTitle;
  }

  public set _subTitle(subTitle: String) {
    this.subTitle = subTitle;
  }

  public get _selectLocImage(): String {
    return this.selectLocImage;
  }

  public set _selectLocImage(selectLocImage: String) {
    this.selectLocImage = selectLocImage;
  }

}
export class ThemeConfig {
  // private primaryColor: String;
  // private secondaryColor: String;
  private colors: any
  private menuDisplayType: Number;

  constructor() {
    this.colors = this.generateJson("#40A944", "#FFFFFF");
    this.menuDisplayType = 16;
  }

  public get _colors(): any {
    return this.colors;
  }

  public set _colors(colors: any) {
    this.colors = colors;
  }
  public get _menuDisplayType(): Number {
    return this.menuDisplayType;
  }

  public set _menuDisplayType(menuDisplayType: Number) {
    this.menuDisplayType = menuDisplayType;
  }

  public generateJson(primaryClr: string, secondaryClr: string) {

    return {
      "--primary-clr": `${primaryClr}`,
      "--secondary-clr": `${secondaryClr}`,
      "--primary-cta-gradient1": `${primaryClr}`,
      "--primary-cta-gradient2": `${primaryClr}FA`,
      "--category-clr": `${primaryClr}1A`,
      "--white-smoke": `${primaryClr}1A`,
      "--location-clr": `${primaryClr}`
    }

  }

}

export class DashboardStep{
    stepSequence: string;
    key: string;
    stepTitle: string;
    stepDescription: string;
    anchor: string;
    createButton: string;
    status: string;
    stepImg: string;
    videoUrl: string;
}

export class SiteContentConfig {
  private description: String;
  private selectLoc: SelectLoc;

  constructor() {
    this.selectLoc = new SelectLoc();
    this.description = '';
  }

  public get _description(): String {
    return this.description;
  }

  public set _description(description: String) {
    this.description = description;
  }

  public get _selectLoc(): SelectLoc {
    return this.selectLoc;
  }

  public set _selectLoc(selectLoc: SelectLoc) {
    this.selectLoc = selectLoc;
  }
}

export class AccountConfigModel {
  private theme: ThemeConfig;
  // private businessType: String;
  // private businessCategory: String;
  private siteContent: SiteContentConfig;
  private appName: String;
  private hostUrl: String;

  constructor(data?) {
    this.theme = new ThemeConfig();
    // this.businessCategory = '';
    // this.businessType = '';
    this.siteContent = new SiteContentConfig();
    this.appName = '';
    this.hostUrl = '';
  }



  public get _theme(): ThemeConfig {
    return this.theme;
  }

  public set _theme(value: ThemeConfig) {
    this.theme = value;
  }


  // public get _businessType(): String {
  //   return this.businessType;
  // }


  // public set _businessType(value: String) {
  //   this.businessType = value;
  // }


  // public get _businessCategory(): String {
  //   return this.businessCategory;
  // }


  // public set _businessCategory(value: String) {
  //   this.businessCategory = value;
  // }


  public get _siteContent(): SiteContentConfig {
    return this.siteContent;
  }


  public set _siteContent(value: SiteContentConfig) {
    this.siteContent = value;
  }


  public get _appName(): String {
    return this.appName;
  }


  public set _appName(value: String) {
    this.appName = value;
  }


  public get _hostUrl(): String {
    return this.hostUrl;
  }


  public set _hostUrl(value: String) {
    this.hostUrl = value;
  }


}