import { Observable, Observer, ApolloLink } from "@apollo/client/core";
import type {
  Operation,
  NextLink,
  FetchResult,
  RequestHandler,
} from "@apollo/client/core";

import type Echo from "laravel-echo";

import type { PresenceChannel, Channel } from "laravel-echo/dist/channel";
import { OperationDefinitionNode, FieldNode } from "graphql";

// The presence channel interface does not have the channel methods,
// but in reality the actual object does, so I try to fix this here.
type FixedEchoChannel = PresenceChannel & Channel;

function subscribeToEcho(
    echoClient: Echo,
    channelName: string,
    observer: Observer<FetchResult>
) {
  const channel = echoClient.private(
      channelName.replace(/^private\-/, "")
  ) as FixedEchoChannel;

  channel.listen(".lighthouse-subscription", ({ result }) =>
      observer.next(result)
  );
}

function unsubscribe(echoClient: Echo, getChannelName: () => string) {
  const channelName = getChannelName();
  if (channelName) {
    echoClient.leave(channelName);
  }
}

function createSubscriptionHandler(
    echoClient: Echo,
    operation: Operation,
    observer: Observer<FetchResult>,
    setChannelName: (name: string) => any
) {
  return (data: FetchResult) => {
    const channelName: string | null = data?.extensions?.lighthouse_subscriptions?.channel

    if (channelName) {
      setChannelName(channelName);
      subscribeToEcho(echoClient, channelName, observer);
    } else {
      observer.next(data);
      observer.complete();
    }
  };
}

function createRequestHandler(echoClient: Echo): RequestHandler {
  return (operation: Operation, forward: NextLink): Observable<FetchResult> => {
    let channelName: string;

    return new Observable((observer) => {
      forward(operation).subscribe(
          createSubscriptionHandler(
              echoClient,
              operation,
              observer,
              (name) => (channelName = name)
          )
      );

      return () => unsubscribe(echoClient, () => channelName);
    });
  };
}

export function createLighthouseSubscriptionLink(echoClient: Echo): ApolloLink {
  return new ApolloLink(createRequestHandler(echoClient));
}