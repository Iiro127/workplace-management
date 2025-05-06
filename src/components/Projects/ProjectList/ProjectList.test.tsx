import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectList from './ProjectList';
import { useAtom } from 'jotai';
import { refreshProjects } from '../../../services/projectService';
import * as jotai from 'jotai';

// Mocking jotai and its useAtom function
jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtom: jest.fn()
}));

// Mocking refreshProjects function from projectService
jest.mock('../../../services/projectService.tsx', () => ({
  refreshProjects: jest.fn(),
}));

// Mock components
jest.mock('../Project/Project.tsx', () => (props) => <div>{props.title}</div>);
jest.mock('../ProjectTitles/ProjectTitles.tsx', () => () => <div>Titles</div>);

// The actual test suite
describe('ProjectList', () => {
    // Mocking console.error to suppress error messages in the test output
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    
    // Restoring the original console.error after each test
    afterEach(() => {
        (console.error as jest.Mock).mockRestore();
    });
      
    // Mocking the useAtom return value
    beforeEach(() => {
        (useAtom as jest.Mock).mockReturnValue([{ tokenRaw: 'abc', isAdmin: true }]);
    });

    // Test cases
    it('shows project titles and projects when API works', async () => {
        (refreshProjects as jest.Mock).mockResolvedValue([
            { id: 1, title: 'Test Project', customer: '', dateAdded: '', finishEstimate: '', status: '', manager: '', members: [] },
        ]);

        render(<ProjectList />);

        await waitFor(() => {
        expect(screen.getByText('Titles')).toBeInTheDocument();
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        });
    });

    // Test case for when the API returns an empty array
    it('does not render projects when API fails', async () => {
        (refreshProjects as jest.Mock).mockRejectedValue(new Error('fail'));

        render(<ProjectList />);

        await waitFor(() => {
            expect(refreshProjects).toHaveBeenCalled();
        });

        expect(screen.queryByText('Test Project')).not.toBeInTheDocument();
    });
});
