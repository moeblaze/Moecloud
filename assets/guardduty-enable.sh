#!/usr/bin/env bash
# Enable GuardDuty in all regions (starter)
for r in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
  aws guardduty create-detector --enable --region "$r" || true
done