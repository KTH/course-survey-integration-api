# Uses UG REST API

## Test your credentials and permissions
Create .env file and run:
```bash
npm run test:integration
```

## How to search
We are interested in these UG trees:
- edu.courses
- edu.schools

https://confluence.sys.kth.se/confluence/display/TJAN/UG+REST+API+examples

UG is a tree structure and searches are constructed to either:
- eq, in -- fetch attributes for single node in the tree
- startswith -- fetch en entire subtree
```
groups?$filter=kthid eq 'ul123ud'
groups?$filter=name eq 'edu.courses.SF.SF1625.20222'
groups?$filter=startswith(name,'edu.courses.SF.SF1625.20222')
```

It is possible that (only these queries)[https://github.com/KTH/ug-rest-api-helper?tab=readme-ov-file#operators-supported-so-far] are supported:
- eq
- startswith
- contains
- in

List of (search query operators)[https://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752358]

Documentation of (search enpoint)[https://integral.developer.azure-api.net/api-details#api=ug-rest-api-ref&operation=search_1].

## About the code
This is based on:
- https://github.com/KTH/kpm/tree/main/packages/kpm-ug-rest-client
- https://github.com/KTH/kpm/blob/47dc499e2fc4f515085352298dd3d5022ccfc6b0/apis/my-studies-api/src/api.ts#L4
