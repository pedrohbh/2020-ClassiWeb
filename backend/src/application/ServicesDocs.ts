import { UserServiceDoc } from './User/UserService.doc';

type DocTag = {
  name: string,
  description: string
}

type DocDefinitions = {
  [model: string]: {
    [prop: string]: any
  }
}

export type ServiceDoc = {
  tag: DocTag,
  definitions: DocDefinitions
}

const ServicesDocs: ServiceDoc[] = [
  UserServiceDoc,
];

export default ServicesDocs;
