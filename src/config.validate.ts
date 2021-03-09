import { Equals, IsOptional, IsPort, IsString, Matches, validateSync } from "class-validator";
import { isAbsolute } from "path";

class EnvironmentVariables {
  @IsOptional()
  @IsString()
  NODE_ENV: string;
  @IsPort({
    message: "$property should be a valid port number"
  })
  PORT: string;
  @Matches(/^postgres:\/\/.+:.+@.+:\d+\/.+$/, {
    message: "$property should be a valid postgres connection URL"
  })
  DB_URL: string;
  @IsString({
    message: "$property should be a string"
  })
  FIREBASE_CREDENTIALS_PATH: string;
  @IsString({
    message: "$property should be a string"
  })
  API_KEY: string;
  @Equals(true, {
    message: "$property should be valid absolute path to file"
  })
  isPathValid: boolean;
  isProduction: boolean;

  constructor(config) {
    this.NODE_ENV = config.NODE_ENV;
    this.PORT = config.PORT || "3000";
    this.DB_URL = config.DB_URL;
    this.FIREBASE_CREDENTIALS_PATH = config.FIREBASE_CREDENTIALS_PATH;
    this.API_KEY = config.API_KEY;
    this.isPathValid = isAbsolute(config.FIREBASE_CREDENTIALS_PATH);
    this.isProduction = (config.NODE_ENV === "production");
  }
}

export function configValidate(config: Record<string, unknown>) {
  const validatedConfig = new EnvironmentVariables(config);
  const errors = validateSync(validatedConfig, { skipMissingProperties: false, dismissDefaultMessages: true });
  console.log(errors);
  if (errors[0]) {
    throw new Error(errors.map((each) => each.toString()).join(", "));
  }
  return validatedConfig;
}