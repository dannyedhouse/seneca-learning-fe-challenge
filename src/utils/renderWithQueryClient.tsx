import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { render } from "@testing-library/react";

const renderWithQueryClient = (ui: ReactElement): RenderResult => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

export default renderWithQueryClient;
