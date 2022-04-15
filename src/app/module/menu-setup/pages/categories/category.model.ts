export class Category {
    public categoryName: string;
    public categoryId: string;
    public isNewlyAddedCategory: boolean = false;
    public isNewlyEditedCategory: boolean = false;
    public isNewlyDeletedCategory: boolean = false;
    public isNewlyAddedSubCategory: boolean = false;
    public subCategories: SubCategory[];
    public createCat: boolean;
    public availableForOrder: boolean;
    public sortIndex: number;
    public menuItems;
    public datepickerDismiss: boolean = false;
    public editedCat:boolean = false;
}

export class SubCategory {
    public subCategoryName: string;
    public subCategoryId: string;
    public editedSub: boolean;
    public subCategorySortIndex: number;
    public isNewlyEditedSubCat: boolean = false;
    public subCatAvailableForOrder: boolean;
}