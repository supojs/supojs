## SUPer Opinionated JS Backend

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Supo.js](#supojs)
  - [Install cli](#install-cli)
  - [Quickstart](#quickstart)
- [Routing](#routing)
  - [Index routes](#index-routes)
  - [Nested routes](#nested-routes)
  - [Dynamic route segments](#dynamic-route-segments)
- [Services](#services)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Supo.js

### Install cli

```bash
npm i -g @supojs/cli
```

### Quickstart

```bash
supojs create app

cd app

supojs serve
```

Open [http://127.0.0.1:3000/hello-world](http://127.0.0.1:3000/hello-world)

## Routing

SupoJS has a file-system based router.

When a file is added to the **routes** directory it's automatically available.

### Index routes

The router will automatically route files named index to the root of the directory.

> routes/index.ts → /

> routes/blog/index.ts → /blog

### Nested routes
The router supports nested files. If you create a nested folder structure files will be automatically routed in the same way still.

> routes/blog/first-post.ts → /blog/first-post

> routes/dashboard/settings/username.ts → /dashboard/settings/username


### Dynamic route segments
To match a dynamic segment you can use the bracket syntax. This allows you to match named parameters.

> pages/blog/[slug].ts → /blog/:slug (/blog/hello-world)

> pages/[username]/settings.ts → /:username/settings (/foo/settings)

## Services

SupoJS has a file-system based dependency injection. It will inject the service with the same **name** as the paramerter after removing "." and "-" and transforming to camel case.

**Types are ignored!! Only param name is used**

> services/email.ts → function(email: EmailService)

> services/email.service.ts → function(emailService: EmailService)

> services/email-amazon.service.ts → function(emailAmazonService: EmailService)

```ts
import FooService from "../services/foo.service";

export default function(fooService: FooService) {
  return fooService.getBar();
}
```

```ts
import RandomNumber from "../services/random-number";

export default function(randomNumber: RandomNumber) {
  return randomNumber.generate();
}
```

