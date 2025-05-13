import { type UseTRPCQueryResult, type UseTRPCQuerySuccessResult } from "@trpc/react-query/shared";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Error as PageError } from "../components/Error";
import { NotFoundPage } from "../pages/other/NotFoundPage";
import { useAppContext, type TAppContext } from "./ctx";

import { routes } from "./routes";

class CheckExistsError extends Error {}
const checkExistsFn = <T,>(value: T, message?: string): NonNullable<T> => {
  if (!value) {
    throw new CheckExistsError(message);
  }
  return value;
};

class CheckAccessError extends Error {}
const checkAccessFn = <T,>(value: T, message?: string): void => {
  if (!value) {
    throw new CheckAccessError(message);
  }
};

class GetAuthorizedMeError extends Error {}

type Props = Record<string, any>;
type QueryResult = UseTRPCQueryResult<any, any>;
type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQuerySuccessResult<
  NonNullable<TQueryResult["data"]>,
  null
>;

type THelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: TAppContext;
  queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult> : undefined;
};
type TSetPropsProps<TQueryResult extends QueryResult | undefined> = THelperProps<TQueryResult> & {
  checkExists: typeof checkExistsFn;
  checkAccess: typeof checkAccessFn;
  getAuthorizedMe: (message?: string) => NonNullable<TAppContext["me"]>;
};
type TPageWrapperProps<TProps extends Props, TQueryResult extends QueryResult | undefined> = {
  redirectAuthorized?: boolean;

  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccess?: (helperProps: THelperProps<TQueryResult>) => boolean;
  checkAccessTitle?: string;
  checkAccessMessage?: string;

  checkExists?: (helperProps: THelperProps<TQueryResult>) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => TQueryResult;
  setProps?: (setPropsProps: TSetPropsProps<TQueryResult>) => TProps;

  title: string | ((titleProps: THelperProps<TQueryResult> & TProps) => string);

  Page: React.FC<TProps>;
};

const PageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>({
  authorizedOnly,
  authorizedOnlyTitle = "Please, Authorize",
  authorizedOnlyMessage = "This page is available only for authorized users",
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = "Access Denied",
  checkAccessMessage = "You have no access to this page",
  checkExists,
  checkExistsTitle,
  checkExistsMessage,
  useQuery,
  setProps,
  title,
  Page,
}: TPageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate();
  const ctx = useAppContext();
  const queryResult = useQuery?.();

  const redirectNeeded = redirectAuthorized && ctx.me;

  useEffect(() => {
    if (redirectNeeded) {
      navigate(routes.notes(), { replace: true });
    }
  }, [redirectNeeded, navigate]);

  if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
    return <p>Loading...</p>;
  }

  if (queryResult?.isError) {
    return <PageError message={queryResult.error.message} />;
  }

  if (authorizedOnly && !ctx.me) {
    return <PageError title={authorizedOnlyTitle} message={authorizedOnlyMessage} />;
  }

  const helperProps = { ctx, queryResult: queryResult as never };

  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps);
    if (accessDenied) {
      return <PageError title={checkAccessTitle} message={checkAccessMessage} />;
    }
  }

  if (checkExists) {
    const notExists = !checkExists(helperProps);
    if (notExists) {
      return <NotFoundPage title={checkExistsTitle} message={checkExistsMessage} />;
    }
  }

  const getAuthorizedMe = (message?: string) => {
    if (!ctx.me) {
      throw new GetAuthorizedMeError(message);
    }
    return ctx.me;
  };

  try {
    const props = setProps?.({
      ...helperProps,
      checkExists: checkExistsFn,
      checkAccess: checkAccessFn,
      getAuthorizedMe,
    }) as TProps;
    const normilizedTitle = typeof title === "function" ? title({ ...helperProps, ...props }) : title;
    return (
      <>
        <Helmet>
          <title>{normilizedTitle}</title>
        </Helmet>
        <Page {...props} />
      </>
    );
  } catch (error) {
    if (error instanceof CheckExistsError) {
      return <NotFoundPage title={checkExistsTitle} message={error.message || checkExistsMessage} />;
    }
    if (error instanceof CheckAccessError) {
      return <PageError title={checkAccessTitle} message={error.message || checkAccessMessage} />;
    }
    if (error instanceof GetAuthorizedMeError) {
      return <PageError title={authorizedOnlyTitle} message={error.message || authorizedOnlyMessage} />;
    }
    throw error;
  }
};

export const withPageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>(
  pageWrapperProps: Omit<TPageWrapperProps<TProps, TQueryResult>, "Page">
) => {
  return (Page: TPageWrapperProps<TProps, TQueryResult>["Page"]) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />;
  };
};
