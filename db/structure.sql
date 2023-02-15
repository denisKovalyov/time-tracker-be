CREATE TABLE "users" (
  "id" bigint generated always as identity,
  "login" varchar NOT NULL
);

ALTER TABLE "users" ADD CONSTRAINT pkUsers PRIMARY KEY (id);
CREATE UNIQUE INDEX akUsersLogin ON "users" (login);

CREATE TABLE "projects" (
  "id" int generated always as identity,
  "name" varchar NOT NULL
);

ALTER TABLE "projects" ADD CONSTRAINT pkProjects PRIMARY KEY (id);
CREATE UNIQUE INDEX akProjectsName ON "projects" (name);

CREATE TABLE "tasks" (
  "id" bigint generated always as identity,
  "name" varchar NOT NULL,
  "type" varchar NOT NULL,
  "time" int NOT NULL,
  "startDate" Date NOT NULL,
  "endDate" Date NOT NULL,
  "projectId" int Not NULL
);

ALTER TABLE "tasks" ADD CONSTRAINT pkTasks PRIMARY KEY ("id");
ALTER TABLE "tasks" ADD CONSTRAINT "fkTasksProjects" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE;

CREATE TABLE "userProject" (
  "userId" bigint NOT NULL,
  "projectId" int NOT NULL
);

ALTER TABLE "userProject" ADD CONSTRAINT "pkUserProject" PRIMARY KEY ("userId", "projectId");
ALTER TABLE "userProject" ADD CONSTRAINT "fkUserProjectUser" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "userProject" ADD CONSTRAINT "fkUserProjectProject" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE;
