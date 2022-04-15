import { BasicDetails } from './basic-details.model';
import { ConfigurationModel } from './config.model';
import { FinancialDetails } from './financial-details.model';
import { FssaiDetails } from './fssai-details.model';
import { GSTInDetails } from './gst-details.model';
import { AuditDetails } from './audit.model';

export class OutletDetails {
	private basic: BasicDetails;
	private opHours: any[];
	private config: ConfigurationModel;
	private opSettingType: string;
	private finance: FinancialDetails;
	private fssai: FssaiDetails;
	private gstin: GSTInDetails;
	private audit: AuditDetails;

	constructor() {
		this.basic = new BasicDetails();
		this.finance = new FinancialDetails();
		this.fssai = new FssaiDetails();
		this.gstin = new GSTInDetails();
		this.opHours = [];
		this.audit = new AuditDetails();
		this.config = new ConfigurationModel();
	}

	public get _basic(): BasicDetails {
		return this.basic;
	}
	public get _audit(): AuditDetails {
		return this.audit;
	}

	public get _finance(): FinancialDetails {
		return this.finance;
	}

	public get _fssai(): FssaiDetails {
		return this.fssai;
	}

	public get _gstin(): GSTInDetails {
		return this.gstin;
	}

	public get _opHours(): any[] {
		return this.opHours;
	}

	public set _basic(value: BasicDetails) {
		this.basic = value;
	}

	public set _audit(value: AuditDetails) {
		this.audit = value;
	}

	public set _finance(value: FinancialDetails) {
		this.finance = value;
	}

	public set _fssai(value: FssaiDetails) {
		this.fssai = value;
	}

	public set _gstin(value: GSTInDetails) {
		this.gstin = value;
	}

	public set _opHours(value: any[]) {
		this.opHours = value;
	}

	public get _config(): ConfigurationModel {
		return this.config;
	}

	public set _config(config: ConfigurationModel) {
		this.config = config;
	}
	public get _opSettingType(): string {
		return this.opSettingType;
	}

	public set _opSettingType(opSettingType: string) {
		this.opSettingType = opSettingType;
	}


}