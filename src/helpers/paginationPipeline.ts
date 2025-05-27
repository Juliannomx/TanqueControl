/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery } from "mongoose";
import type { PipelineStage } from "mongoose";

export const paginationPipeline = <T extends Record<string, any>>(
  page = "1",
  pageSize = 10,
  filter: FilterQuery<T> = {},
): PipelineStage[] => {
  const skip = (Number(page) - 1) * pageSize;

  return [
    {
      $match: {
        ...filter,
      },
    },

    {
      $lookup: {
        from: "reference_values",
        localField: "referenceValue",
        foreignField: "_id",
        as: "referenceValue",
      },
    },
    { $unwind: "$referenceValue" },

    {
      $facet: {
        total: [
          {
            $count: "count",
          },
        ],
        data: [
          {
            $addFields: {
              _id: "$_id",
              referenceValue: "$referenceValue.value",
            },
          },
        ],
      },
    },
    {
      $unwind: "$total",
    },

    {
      $project: {
        items: {
          $slice: [
            "$data",
            skip,
            {
              $ifNull: [pageSize, "$total.count"],
            },
          ],
        },
        page: {
          $literal: skip / pageSize + 1,
        },
        hasNextPage: {
          $lt: [{ $multiply: [pageSize, Number(page)] }, "$total.count"],
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.count", pageSize],
          },
        },
        totalItems: "$total.count",
      },
    },
  ];
};
