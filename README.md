# deno-streams-hang
Demonstrates how Node and Deno have different behavior.

Run the node version of the app:
```
$ node main.js
done:  1718409332487.jpg
```

Run the deno version of the app:
```
$ deno run --allow-all main.ts
```

The latter hangs indefinitely.

## S3 Setup

To run these scripts, You'll need an S3 bucket and a user key and secret.

First create a bucket.

You must enable public access and enable ACLs on the bucket and use a public policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[BUCKET_NAME]/*"
        }
    ]
}
```

We can allow access to web browsers via CORS:
```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag",
            "Content-Length"
        ]
    }
]
```

After the bucket is created, we need to create a user group with policy over
the S3 bucket:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::[BUCKET_NAME]/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::[BUCKET_NAME]"
      ]
    }
  ]
}
```

Now create a user, and generate an access key id and secret access key.
We will add this to a file `~/.aws/credentials`:
```
[default]
aws_access_key_id = [KEY]
aws_secret_access_key = [SECRET]
```
